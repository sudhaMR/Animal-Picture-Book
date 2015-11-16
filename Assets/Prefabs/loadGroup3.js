#pragma strict
import System.Collections.Generic;
import CSVReader;

public static var csvStringReptile : String[] = new String[150];
public static var isJungle: boolean;
public static var isDomestic: boolean;
public static var isReptile: boolean;

public var shortURL :String = "https://docs.google.com/spreadsheets/d/1nMMhNLfx_Xl_LH9VQyiCmLjUR_iLZitBzB1hl-XIB_Y/pub?output=csv";
function OnClick()
{

	isJungle = false;
	isDomestic = false;
	isReptile = true;
		 
    var data:List.<Dictionary.<String,Object> > = new List.<Dictionary.<String,Object> >();
	data = CSVReader.Read("Shortlist");
	Debug.Log(data);

	Debug.Log("name " + data[1]["Reptile"]);	

	var x:int;
	var i:int = 0;
	
	for(x = 0; x < data.Count ; x++)
		{	
			var csvStringTemp:String = data[x]["Reptile"];
			csvStringReptile[i++] = csvStringTemp;
		}
		
	Application.LoadLevel("new scene2");
}


function Start () {
}

function Update () {
}