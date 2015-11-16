#pragma strict
import System;
import  UnityEngine.UI;

public static var animalName:String = "";
function Start () {

	animalName = animalName.Replace("%20"," ");
	var charToString: String = ""+animalName[0];//a		
	var descriptionTemp1: String = charToString.ToUpper();
	var descriptionTemp2: String = animalName.Substring (1,animalName.length-1);
	var description:String = descriptionTemp1+descriptionTemp2;
	
	var gettext: UnityEngine.UI.Text = this.gameObject.GetComponent(UnityEngine.UI.Text);
	gettext.text = description;

}
