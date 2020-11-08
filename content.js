document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	

	// div with "contain-402" changes when someone try to join the meet.
	// Only observe that div, if it is available
	function addObserverIfDesiredNodeAvailable() 
	{
		let container = document.getElementById('contain-402');	
		
		// Check if observer should start or not
		if(!container) {
			//The node we need does not exist yet.
			//Wait 500ms and try again
			window.setTimeout(addObserverIfDesiredNodeAvailable,500);
			// console.log("Node not found!")
			return;
		}
		
		let options = {
				attributes: true,
				attributeFilter: ['aria-hidden']
			},
			observer = new MutationObserver(myCallback);
		
		// Callback function for MutationObserver
		function myCallback (mutations) 
		{
			for (let mutation of mutations) 
			{
				if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') 
					if(container.hasAttribute('aria-hidden'))
						setTimeout(autoAdmit, 500);		// Calling the autoAdmit Function
			}
		}

		// Telling the MutationObserver to observe
		observer.observe(container, options);
	}

	//setInterval(autoAdmit, 100);	

	// Function performing auto-admitting students to the MEET whomever has the link 
	function autoAdmit()
	{
		// Finding the element which contains the string = "Admit"
		let p = [...document.querySelectorAll("*")].filter(e => e.childNodes && [...e.childNodes].find(n => n.nodeValue?.match("Admit")));
		
		// The code
		if(p[0] !== undefined)
		{	
	
			// Better approach just to grab one element using querySelector
			let dialogBoxElement = document.querySelector('div[aria-label="Someone wants to join this meeting"][role="dialog"]')

			let imageElements = dialogBoxElement.querySelectorAll('img')

			let userImg, userName;

			imageElements.forEach(img => {
				if(img.src.indexOf("googleusercontent") > -1)
				{
					userImg = img
				}
			});

			userName = userImg.parentElement.textContent;
	
			let myNode = p[0];
			while(myNode)
			{
				myNode = myNode.parentNode;
				if(myNode.hasAttribute('role'))
					if(myNode.getAttribute('role')=="button")    
						break;
			}
			// Finding actual element and getting the 'div'
			let admitId = myNode.getAttribute('data-id');
			document.querySelector(`div[data-id="${admitId}"]`).click();
			console.log(userName,"Admitted Successfully @ ",new Date());
		}
	}

	addObserverIfDesiredNodeAvailable();

});
