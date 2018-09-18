package at.dccs.rest;

import java.io.IOException;
import java.util.List;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class Formular
{
    private String formName = "";
    private int formVersion = 0;
    private List<Element> elements;


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
	   public List<Element> getElements()
	   {
		  return elements;
	  }
	  public void setElements(final List<Element> elements)
	  {
		  this.elements = elements;
	  }
	  public String toJson()
	  {
      ObjectMapper mapper = new ObjectMapper();
      String json = "";
      	try 
      	{
	  		  json = mapper.writeValueAsString(this);
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
 }
