#pragma strict
import System.Collections.Generic;
import CSVReader;

public static var csvStringJungle : String[] = new String[150];
public static var isJungle: boolean;
public static var isDomestic: boolean;
public static var isReptile: boolean;

public var shortURL :String = "https://docs.google.com/spreadsheets/d/1nMMhNLfx_Xl_LH9VQyiCmLjUR_iLZitBzB1hl-XIB_Y/pub?output=csv";
function OnClick()
{

	isJungle = true;
	isDomestic = false;
	isReptile = false;
	
	Debug.Log(csvStringJungle.GetUpperBound);
	//csvStringJungle[0] = "Hahaaha";
	
	/*var shortw: WWW = new WWW(shortURL);
	yield shortw;
	var strbuilder:StringBuilder = new StringBuilder();	
	var bytesFromWeb:byte[];	
	var csvstring: String = shortw.text;
	Debug.Log(csvstring);
	
    bytesFromWeb = System.Text.Encoding.UTF8.GetBytes(csvstring);
    	//System.IO.File.WriteAllBytes ( Application.persistentDataPath+"/"+"Shortlist.csv",bytesFromWeb );
    System.IO.File.WriteAllBytes ( path,bytesFromWeb );

	#if UNITY_EDITOR
     	UnityEditor.AssetDatabase.Refresh ();
    #endif
    */ 	 
    var data:List.<Dictionary.<String,Object> > = new List.<Dictionary.<String,Object> >();
	data = CSVReader.Read("Shortlist");
	Debug.Log(data);

	Debug.Log("name " + data[1]["Jungle"]);	

	var x:int;
	var i:int = 0;
	print("Length from file"+csvStringJungle.Length);
	print("count from download"+downloadCSV.dataCount);
	for(x = 0; x < data.Count ; x++)
		{	
			var csvStringTemp:String = data[x]["Jungle"];
			csvStringJungle[i++] = 	csvStringTemp;
		}
		
	Application.LoadLevel("new scene2");
}


function Start () {

}

function Update () {

}