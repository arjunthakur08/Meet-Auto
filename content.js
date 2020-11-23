document.addEventListener('DOMContentLoaded', () => {
	'use strict';
	

	// Function performing auto-admitting students to the MEET whomever has the link 
	function autoAdmit()
	{
		// Getting all buttons which are inside any dialog box
		let btns = document.querySelectorAll('div[role="dialog"] div[role="button"]');		
		btns.forEach(function(btn){
			if(btn.innerText.toLowerCase()=='admit' || btn.innerText.toLowerCase()=="admit all")
				btn.click();
			else if (btn.innerText.toLowerCase()=='view all')
			{
				btn.click();
				setTimeout(function(){btn.click();},800);
				
			}
		});
	}
	
	setInterval(autoAdmit, 500);	
});
