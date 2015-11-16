#pragma strict
import System.Collections.Generic;
import CSVReader;
import System;
import UnityEngine.UI;

public var shortURL :String = "https://docs.google.com/spreadsheets/d/1nMMhNLfx_Xl_LH9VQyiCmLjUR_iLZitBzB1hl-XIB_Y/pub?output=csv";
public static var dataCount:int;

function Start ()
{
	var path:String;
	var shortw: WWW = new WWW(shortURL);
	yield shortw;
	
	 #if UNITY_EDITOR
     	 path = "Assets/Resources/Shortlist.csv";
     #endif
     #if UNITY_STANDALONE         
         path = "MyGame_Data/Resources/Shortlist.csv"
     #endif
	
	var data:List.<Dictionary.<String,Object> > = new List.<Dictionary.<String,Object> >();
	var strbuilder:StringBuilder = new StringBuilder();	
	var bytesFromWeb:byte[];	
	var csvstring: String = shortw.text;
	Debug.Log(csvstring);
	
    bytesFromWeb = System.Text.Encoding.UTF8.GetBytes(csvstring);
    System.IO.File.WriteAllBytes(path,bytesFromWeb);
    
    #if UNITY_EDITOR
     		UnityEditor.AssetDatabase.Refresh ();
    #endif
    
    data = CSVReader.Read("Shortlist");
    dataCount = data.Count;
    
 /*	#if UNITY_EDITOR
     		UnityEditor.AssetDatabase.Refresh ();;
    #endif*/
     	 
}