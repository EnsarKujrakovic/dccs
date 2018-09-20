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

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@NamedQueries({
        @NamedQuery(name = "element.exists", query = "select e from Element e " + 
        "where e.formName = :fN and e.formVersion = :fV and ((e.elementId = :id )or" +
        "(e.label = :label and e.type = :type and e.validation = :validation))"),
        @NamedQuery(name = "element.list", query = "select e from Element e where e.formName = :fN and e.formVersion = :fV"),
        @NamedQuery(name = "element.forms", query = "select distinct e.formName from Element e order by e.formName")
})
@XmlRootElement(name = "element")
public class Element implements Cloneable
{
  @Id
  @GeneratedValue
  private long elementId;
  private String formName;
  private int formVersion;
  private String label;
  private String type;
  private String validation;
  private String[] value;

  public long getElementId()
  {
	  return this.elementId;
  }

  public void setElementId(long elementId)
  {
	  this.elementId = elementId;
  }   
  public String getLabel()
  {
	  return this.label;
  }

  public void setLabel(final String label) {
	  this.label = label;
  }   
  public String getType() {
	  return this.type;
  }

  public void setType(final String type) {
	  this.type = type;
  }   
  public String getValidation() {
	  return this.validation;
  }

  public void setValidation(final String validation)
  {
	  this.validation = validation;
  }   
  public String[] getValue()
  {
	  return this.value;
  }

  public void setValue(final String[] value)
  {
	  this.value = value;
  }
 
  public String getFormName()
  {
	  return formName;
  }
  public void setFormName(final String formName)
  {
	  this.formName = formName;
  }
  public int getFormVersion()
  {
	  return formVersion;
  }
  public void setFormVersion(final int formVersion)
  {
	  this.formVersion = formVersion;
  }

  public Element copy()
  {
    Element element = new Element();
    element.setElementId(getElementId());
    element.setFormName(getFormName());
    element.setFormVersion(getFormVersion());
    element.setLabel(getLabel());
    element.setType(getType());
    element.setValidation(getValidation());
    element.setValue(getValue());
    return element;
  }

  @Override
  public boolean equals(Object o)
  {
    if (this == o)
      return true;
    if (o == null || !Element.class.isAssignableFrom(o.getClass()))
      return false;
    Element element = (Element) o;
    return elementId == element.elementId;
  }
  @Override
  public int hashCode() {
    return (int) (elementId ^ (elementId >>> 32));
  }
}
