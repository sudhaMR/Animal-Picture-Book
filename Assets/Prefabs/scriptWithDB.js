﻿#pragma strict
import LitJson;
import System;
import UnityEngine.UI;
import System.IO;
import System.Text;
import System.Collections.Generic;
import CSVReader;

@SerializeField
 var buttonPrefab:GameObject;
@SerializeField
 var menuPanel:Transform ;
public var button :GameObject; 

public var url: String = "https://en.wikipedia.org/w/api.php?action=query&prop=links&format=json&pllimit=max&iwurl=&rawcontinue=&titles=List%20of%20animal%20names&redirects=&converttitles=";
public var shortURL :String = "https://docs.google.com/spreadsheets/d/1nMMhNLfx_Xl_LH9VQyiCmLjUR_iLZitBzB1hl-XIB_Y/pub?output=csv";
function Start () {	
	var exists: int=0;
	var path : String;
	var x: int = 0;
	Debug.Log(Application.persistentDataPath);
	if(System.IO.File.Exists(Application.persistentDataPath+"/"+"Shortlist"))
					exists = 1;
	else		
					exists = 0;		
		
	 #if UNITY_EDITOR
     	 path = "Assets/Resources/Shortlist.csv";
     #endif
     #if UNITY_STANDALONE         
         path = "MyGame_Data/Resources/Shortlist.csv";
     #endif

		var shortw: WWW = new WWW(shortURL);
		yield shortw;
		var strbuilder:StringBuilder = new StringBuilder();	
		var bytesFromWeb:byte[];	
		var csvstring: String = shortw.text;
		Debug.Log(csvstring);
	
    	bytesFromWeb = System.Text.Encoding.UTF8.GetBytes(csvstring);
    	//System.IO.File.WriteAllBytes ( Application.persistentDataPath+"/"+"Shortlist.csv",bytesFromWeb );
    	System.IO.File.WriteAllBytes ( path,bytesFromWeb );
		var data:List.<Dictionary.<String,Object> > = new List.<Dictionary.<String,Object> >();
		 #if UNITY_EDITOR
     		UnityEditor.AssetDatabase.Refresh ();
     	 #endif
     	 
		data = CSVReader.Read("Shortlist");
		Debug.Log(data);
		Debug.Log("name " + data[1]["Jungle"]);						
	
	if(System.IO.File.Exists(Application.persistentDataPath+"/"+"DBdescriptionFile"))
	{
			//Application.LoadLevel("LoadFromDisk");
	}
		
	else
	{	  		
	var www: WWW = new WWW(url);	
	yield www;
	var jsonFile: JsonData = JsonMapper.ToObject(www.text);
	Debug.Log(jsonFile);
	var p: int = 0;
	var i: int = 0;	
	
	var sb:StringBuilder = new StringBuilder();
    var writer:JsonWriter = new JsonWriter(sb);	
			
	var bytes:byte[];	
	var count: int = jsonFile["query"]["pages"]["229623"]["links"].Count-7;
	Debug.Log("count:"+count);
	
	writer.WriteObjectStart();
	writer.WritePropertyName("details");
   
    writer.WriteArrayStart();

 	for(i = 0; i < count-300; i++)
	{			
		var descriptionMixed: String = jsonFile["query"]["pages"]["229623"]["links"][i]["title"].ToString();
		Debug.Log(i);
		Debug.Log(data.Count);	
		
		
		for(x = 0; x < data.Count ; x++)
		{			
				var csvString:String;
				csvString = data[x]["Jungle"]; 
			//if(descriptionMixed.Contains(data[x]["Jungle"].ToString()) )
				Debug.Log("Check:"+descriptionMixed);
				Debug.Log("x = "+x+","+descriptionMixed.Contains(csvString));
				if(descriptionMixed == csvString)
				{
					print("From csv file:"+data[x]["Jungle"]);
					print("From csv file:"+csvString);
				}
		}
		
		
		
		
		if(descriptionMixed.Contains("Class") || descriptionMixed.Contains("Family") || descriptionMixed.Contains("behaviour") 
			|| descriptionMixed.Contains("Indentifier") || descriptionMixed.Contains("vicu") || descriptionMixed.Contains("Bacon")	
			|| descriptionMixed.Contains("Beef") || descriptionMixed.Contains("Collateral") || descriptionMixed.Contains("Capon")
			|| descriptionMixed.Contains("Calamari") || descriptionMixed.Contains("Book") || descriptionMixed.Contains("News")
			|| descriptionMixed.Contains("hunting") || descriptionMixed.Contains("Meat") || descriptionMixed.Contains("List")	
			|| descriptionMixed.Contains("mutton") || descriptionMixed.Contains("Jenny") || descriptionMixed.Contains("James")
			|| descriptionMixed.Contains("International") || descriptionMixed.Contains("Female") || descriptionMixed.Contains("Digital"))
			{
				i = i + 1;
				descriptionMixed = jsonFile["query"]["pages"]["229623"]["links"][i]["title"].ToString();
			}
			
		if(	 descriptionMixed.Contains("noun") || descriptionMixed.Contains("Colt") || descriptionMixed.Contains("Castration")
			|| descriptionMixed.Contains("Indentifier") || descriptionMixed.Contains("Flake") || descriptionMixed.Contains("Ham")
			|| descriptionMixed.Contains("Juliana") || descriptionMixed.Contains("Kettle") || descriptionMixed.Contains("Morro")
			|| descriptionMixed.Contains("Pork") || descriptionMixed.Contains("Rock") || descriptionMixed.Contains("Taxa")
			|| descriptionMixed.Contains("Trivial") || descriptionMixed.Contains("Veal") || descriptionMixed.Contains("Venison")
			|| descriptionMixed.Contains("William") || descriptionMixed.Contains("List")|| descriptionMixed.Contains("Swarm"))	
			{
				i = i + 1;
				descriptionMixed = jsonFile["query"]["pages"]["229623"]["links"][i]["title"].ToString();
			}
			
		if(descriptionMixed.Contains("Colt") || descriptionMixed.Contains("Venison") || descriptionMixed.Contains("Lists") 
		|| descriptionMixed.Contains("Goshawk")  || descriptionMixed.Contains("Escargot") || descriptionMixed.Contains("Planula")
		|| descriptionMixed.Contains("PubMed")|| descriptionMixed.Contains("Sparrowhawk")|| descriptionMixed.Contains("Squab")
		|| descriptionMixed.Contains("Steers")|| descriptionMixed.Contains("Bony Fish"))
		{
			i = i + 1;
			
			descriptionMixed = jsonFile["query"]["pages"]["229623"]["links"][i]["title"].ToString();
		}
			
				
		
		descriptionMixed = descriptionMixed.Replace("Aves","Bird");
		descriptionMixed = descriptionMixed.Replace("Blackback","Gorilla");
		descriptionMixed = descriptionMixed.Replace("Boar","Wild Boar");
		descriptionMixed = descriptionMixed.Replace("Bony Fish","Osteichthyes");
		descriptionMixed = descriptionMixed.Replace("Dotterel","Eurasian Dotterel");
		descriptionMixed = descriptionMixed.Replace("Stallion (horse)","Stallion");
		
		
		var descriptionLower: String = descriptionMixed.ToLower(); //aardvark
		var charToString: String = descriptionLower[0]+"\0";//a
		var descriptionTemp1: String = charToString.ToUpper();//A
		var descriptionTemp2: String = descriptionLower.Substring (0,descriptionLower.length);//ardvark
		var description:String = descriptionTemp2;//aardvark
		description = description.Replace(" ","%20");
		
		var getPageIdURL = GetPageID(description);
		var yyy: WWW = new WWW(getPageIdURL);
		yield yyy;
		var PageIdUrl: JsonData = JsonMapper.ToObject(yyy.text);
		var PageID: String = PageIdUrl["query"]["pageids"][0].ToString();	
		
		writer.WriteObjectStart();
        writer.WritePropertyName("title");
        writer.Write(description);
        writer.WritePropertyName("id");
        writer.Write(PageID);
        writer.WritePropertyName("name");
        writer.Write(descriptionLower);
        writer.WriteObjectEnd();
								
    	}//end of for
	Debug.Log("After for : " + i);    	
    writer.WriteArrayEnd();
    writer.WriteObjectEnd();
    var temp: String = sb.ToString();
    bytes = System.Text.Encoding.UTF8.GetBytes(temp);
    System.IO.File.WriteAllBytes ( Application.persistentDataPath+"/"+"DBdescriptionFile",bytes );
	}//end of else
	
	Debug.Log("Done saving");	
	
	var directoryPath: String = "/DBdescriptionFile";		
	Debug.Log("file://"+Application.persistentDataPath+directoryPath);
    var ppp: WWW = new WWW("file://"+Application.persistentDataPath+directoryPath);
	yield ppp;
	Debug.Log(ppp);
	var jsonBooks: JsonData = JsonMapper.ToObject(ppp.text);
	var j: int = 0;
	var imgurl: String;
	Debug.Log(jsonBooks);		
	var countJSON: int = jsonBooks["details"].Count;
	
	for(j = 0; j < countJSON;j++)				
	{	descriptionMixed = jsonBooks["details"][j]["title"].ToString();			
		var descriptionMixed2:String = descriptionMixed.Replace("%20"," ");
		
		var descriptionLower2:String = jsonBooks["details"][j]["name"].ToString();
		
		for(x = 0; x < data.Count ; x++)
		{		
			csvString = data[x]["Jungle"].ToString();
			//if(descriptionMixed.Contains(data[x]["Jungle"].ToString()) )
				Debug.Log("Check2:"+descriptionMixed2);
				if(csvString == descriptionMixed2 )				
				{
					print("From csv file:"+descriptionMixed2);
				}
		}				
				
		//Debug.Log("From csv file out loop:"+data[x]["Jungle"]);								
															
		button  = Instantiate (buttonPrefab);	
		button.GetComponentInChildren(UnityEngine.UI.Button).name = descriptionMixed;
		button.GetComponentInChildren(UnityEngine.UI.Text).alignment = TextAnchor.LowerCenter;	
		button.GetComponentInChildren(UnityEngine.UI.Text).fontSize = 24;
		button.GetComponentInChildren(UnityEngine.UI.Text).text = descriptionMixed2;
				
		description = jsonBooks["details"][j]["title"].ToString();	
		var sendOnClick:String = description;
		
		var animalID:String = jsonBooks["details"][j]["id"].ToString();
		
		var b : Button = button.GetComponent(UnityEngine.UI.Button);		
		
		b.onClick.AddListener((function (sendOnClick,animalID){ 
											 function (){	  Debug.Log("listener:"+sendOnClick+"id:"+animalID);	
											 				 // Debug.Log("listener:"+button.GetComponentInChildren(UnityEngine.UI.Button).name);													
															  ButtonClicked(sendOnClick,animalID);
													   };
										})
							 (sendOnClick,animalID));	
			  
		var PageIDfromFile: String = jsonBooks["details"][j]["id"].ToString();
	
		var bytes2:byte[];
		var texture: Texture2D;
	
		if(System.IO.File.Exists(Application.persistentDataPath+"/"+descriptionLower2+".PNG") )
		{			
			Debug.Log("In file system");
			var imgload: WWW = new WWW("file://"+Application.persistentDataPath+"/"+descriptionLower2+".PNG");
			yield imgload;
			Debug.Log("file://"+Application.persistentDataPath+"/"+descriptionLower2+".PNG");
			Debug.Log(imgload);
			texture = imgload.texture;			
		}
		else
		{
		Debug.Log("In www system");
     	imgurl = CreateURL(descriptionMixed);		
		var iii: WWW =  new WWW(imgurl);
		yield iii;

		var imageUrl: JsonData = JsonMapper.ToObject(iii.text);

		Debug.Log(imgurl);
		Debug.Log("Title:"+descriptionMixed);
		Debug.Log("Id:"+PageIDfromFile);
			
		temp = imageUrl["query"]["pages"][PageIDfromFile]["thumbnail"]["source"].ToString();
		Debug.Log("Image URL:"+temp);
		var zzz: WWW = new WWW(temp);			
		yield zzz;
		Debug.Log ("Loaded Image");	
		Debug.Log(zzz);
		texture = zzz.texture;
		Debug.Log("From web"+ Application.persistentDataPath+descriptionLower2+".PNG");
     	System.IO.File.WriteAllBytes ( Application.persistentDataPath+"/"+descriptionLower2+".PNG", texture.EncodeToPNG());
 		}
	
		var fillOriginName: String = " ";
		var img: UnityEngine.UI.Image  = button.gameObject.GetComponent(UnityEngine.UI.Image);
		Debug.Log("Image:"+img);
		img.type = img.Type.Filled;		
		img.fillAmount = 0.8;
		img.fillMethod = img.fillMethod.Vertical;
		img.fillOrigin = UnityEngine.UI.Image.OriginVertical.Top;
				
		img.sprite = Sprite.Create (texture, new Rect (0, 0, texture.width , texture.height),Vector2.zero);
		
		Debug.Log("Done");
		button.transform.parent = menuPanel;
	}
	 Debug.Log("Out of loop");	 

}

function ButtonClicked(title,animalId)
{	
	populate.animalName = title;
	populate.pageID = animalId;
	NewBehaviourScript1.animalName = title;
	NewBehaviourScript1.pageID = animalId;
	displayTitle.animalName = title;
	Debug.Log("onclick"+title);
	Application.LoadLevel("ATemp");
}

function CreateURL(menuTitle)
{	
	 var temp: String = "https://en.wikipedia.org/w/api.php?";
	 //var URLtemp: String = "action=query&prop=pageimages&format=json&piprop=original&iwurl=&rawcontinue=&titles="+menuTitle;
	 var URLtemp:String = "action=query&prop=pageimages&format=json&piprop=thumbnail&iwurl=&rawcontinue=&titles="+menuTitle+"&redirects=&converttitles=";
	 return temp + URLtemp;	
}

function GetPageID(animaltitle)
{
	var jsonURL: String = "https://en.wikipedia.org/w/api.php?action=query&prop=info&format=json&inprop=talkid%7Csubjectid%7Curl&indexpageids=&iwurl=&rawcontinue=&titles="+animaltitle+"&redirects=&converttitles=";
	return jsonURL;
}
