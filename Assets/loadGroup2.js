#pragma strict
import System.Collections.Generic;
import CSVReader;

public static var csvStringDomestic : String[] = new String[150];
public static var isJungle: boolean;
public static var isDomestic: boolean;
public static var isReptile: boolean;

public var shortURL :String = "https://docs.google.com/spreadsheets/d/1nMMhNLfx_Xl_LH9VQyiCmLjUR_iLZitBzB1hl-XIB_Y/pub?output=csv";
function OnClick()
{

	isJungle = false;
	isDomestic = true;
	isReptile = false;
	
    var data:List.<Dictionary.<String,Object> > = new List.<Dictionary.<String,Object> >();
	data = CSVReader.Read("Shortlist");
	Debug.Log(data);

	Debug.Log("name " + data[1]["Domestic/Farm"]);	

	var x:int;
	var i:int = 0;
	
	for(x = 0; x < data.Count ; x++)
		{	
			var csvStringTemp:String = data[x]["Domestic/Farm"];
			csvStringDomestic[i++] = csvStringTemp;
		}
		
	Application.LoadLevel("new scene2");
}


function Start () {

}

function Update () {

}