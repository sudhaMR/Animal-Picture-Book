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
	Debug.Log("Animal Name"+animalName);

	var description: String = jsonBooks["query"]["pages"][pageID]["thumbnail"]["original"].ToString();
	Debug.Log("Description:"+description);
	var zzz: WWW = new WWW(description);	
	yield zzz;
	
	Debug.Log ("Loaded Image");
	Debug.Log("texture:"+zzz.texture);
	
	
		var texture: Texture2D = zzz.texture;
		
		var img: UnityEngine.UI.Image  = this.gameObject.GetComponent(UnityEngine.UI.Image);
		Debug.Log("Image:"+img);
		img.sprite = Sprite.Create (texture, new Rect (0, 0, texture.width, texture.height),Vector2.zero);	
}


function CreateURL()
{
	// var temp: String = "https://en.wikipedia.org/w/api.php?";
	 //var URLtemp: String = "action=query&list=allimages&format=json&aisort=name&aiprop=url&aiprefix=Octopus&iwurl=&rawcontinue=&titles=Octopus&redirects=&converttitles=";
	// var URLtemp: String = "action=query&prop=pageimages&format=json&piprop=thumbnail%7Cname%7Coriginal&iwurl=&rawcontinue=&titles=Aardvark";
	 var wikiURL: String = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=thumbnail%7Cname%7Coriginal&iwurl=&rawcontinue=&titles="+animalName;
	 Debug.Log("populate:"+wikiURL);
	// return temp + URLtemp;
	return wikiURL;
	
}

/*
function JsonDataContainsKey(data,key,pageID)
    {
        var result:Boolean = false;
        if(data == null)
            return result;
       if(!(data.IsObject))
        {
            return result;
        }
        //data = data["query"]["pages"][pageID]["thumbnail"]["original"];
        var tdictionary:IDictionary = data as IDictionary;
        if(tdictionary == null)
            return result;
        if(tdictionary.Contains(key))
        {
            result = true;
        }
        return result;
    }*/