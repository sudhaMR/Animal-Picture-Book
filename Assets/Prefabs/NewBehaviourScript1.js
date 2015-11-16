#pragma strict
//import UnityEngine;
import LitJson;
import System;
//import System.Collections;
import  UnityEngine.UI;

public static var animalName:String = "";
public static var pageID:String = "";
function Start () {
	var url:String;
	url = CreateURL();
	var www: WWW = new WWW(url);	
	
	yield www;
	
	var jsonBooks: JsonData = JsonMapper.ToObject(www.text);
	var description: String = jsonBooks["query"]["pages"][pageID]["extract"].ToString();
	Debug.Log(description);
	
	Debug.Log ("Loaded text");
	
	var gettext: UnityEngine.UI.Text = this.gameObject.GetComponent(UnityEngine.UI.Text);
	gettext.text = description;
		
	Debug.Log("Done text");

}


function CreateURL()
{
	 var temp: String = "https://en.wikipedia.org/w/api.php?";
	 //var URLtemp: String = "action=query&prop=extracts&format=json&exintro=&explaintext=&exsectionformat=plain&iwurl=&rawcontinue=&titles="+animalName+"&redirects=&converttitles=";
	 var URLtemp: String = "action=query&prop=extracts&format=json&exsentences=4&exintro=&explaintext=&exsectionformat=plain&iwurl=&titles="+animalName+"&redirects=&converttitles=";
	 Debug.Log("NewBehv:"+temp+URLtemp);
	 return temp + URLtemp;	
}
