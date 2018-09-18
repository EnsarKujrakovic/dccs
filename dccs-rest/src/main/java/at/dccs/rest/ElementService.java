/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 *     contributor license agreements.  See the NOTICE file distributed with
 *     this work for additional information regarding copyright ownership.
 *     The ASF licenses this file to You under the Apache License, Version 2.0
 *     (the "License"); you may not use this file except in compliance with
 *     the License.  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */
package at.dccs.rest;

import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;


@Singleton
@Lock(LockType.WRITE)
@Path("/formular")
@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.Application_JSON)
public class ElementService
{

  @PersistenceContext
  private EntityManager em;

  @Path("/list")
  @GET
  public String list(@QueryParam("formName")  String fN,
                     @QueryParam("formVersion") int fV)
  {
    Formular f = new Formular();
    List<Element> elements = new ArrayList<Element>();
    List<Element> found = em.createNamedQuery("element.list", Element.class).setParameter("fN", fN).setParameter("fV", fV).getResultList();
    for (Element e : found)
    {
      elements.add(e.copy());
    }
    if(elements.size() > 0 )
    {
      f.setFormName(elements.get(0).getFormName());
      f.setFormVersion(elements.get(0).getFormVersion());
      f.setElements(elements);
      return f.toJson();
    }
    return f.toJson();
  }
  
  @Path("/forms")
  @GET
  public String forms()
  {
    List<Element> found = em.createNamedQuery("element.forms", Element.class).getResultList();
    ObjectMapper mapper = new ObjectMapper();
    String json = "";
    try
    {
  	  json = mapper.writeValueAsString(found);
      return json;
  	} catch (JsonGenerationException e)
  	{
      e.printStackTrace();
      return json;
		} catch (JsonMappingException e)
		{
      e.printStackTrace();
      return json;
  	} catch (IOException e)
  	{
      e.printStackTrace();
  	 return json;
    }
  }
  @Path("/save")
  @POST
  public Response update(String json)
  {
    ObjectMapper mapper = new ObjectMapper();
    try
    {
      Formular form = mapper.readValue(json, Formular.class);
  		List<Element> elements = form.getElements();
      for(int i = 0; i < elements.size(); i++){
        List<Element> found = em.createNamedQuery("element.exists", Element.class)
                             .setParameter("id", elements.get(i).getElementId())
                             .setParameter("fN", form.getFormName())
                             .setParameter("fV", form.getFormVersion())
                             .getResultList();
        if(found.size() > 0)
        {
          em.merge(elements.get(i));
        } else
        {
          Element e = new Element();
          e.setFormName(form.getFormName());
          e.setFormVersion(form.getFormVersion());
          e.setLabel(elements.get(i).getLabel());
          e.setType(elements.get(i).getType());
          e.setValidation(elements.get(i).getValidation());
          e.setValue(elements.get(i).getValue());
          em.persist(e);
        }
      }
      return Response.status(201).entity("data saved").build();
  	}catch (JsonGenerationException e)
  	{
      e.printStackTrace();
		} catch (JsonMappingException e)
		{
      e.printStackTrace();
  	} catch (IOException e)
  	{
    	e.printStackTrace();
    }
    return Response.status(202).entity("data not saved").build();
  }
}
