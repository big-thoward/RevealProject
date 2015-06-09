if(data.product.StaticSpecGroups.Countdown)
			{
				var theyear = parseInt(data.product.StaticSpecGroups.Countdown.Specs.Year.Value,10);
				var themonth = parseInt(data.product.StaticSpecGroups.Countdown.Specs.Month.Value,10);
				var theday = parseInt(data.product.StaticSpecGroups.Countdown.Specs.Day.Value,10);
				themonth = themonth-1;
				var newItem = document.createElement("SPAN");
				var newItem2 = document.createElement("SPAN");
				var newItem3 = document.createElement("SPAN");
				var newItem4 = document.createElement("SPAN");
				var textnode = document.createTextNode(":");
				var textnode2 = document.createTextNode(":");
				var textnode3 = document.createTextNode(":");
				var textnode4 = document.createTextNode(":");
				newItem.appendChild(textnode);
				newItem2.appendChild(textnode2);
				newItem3.appendChild(textnode3);
				newItem4.appendChild(textnode4);
				newItem.className = "deliminator";
				newItem2.className = "deliminator";
				newItem3.className = "deliminator";
				newItem4.className = "deliminator";

				var clock = document.getElementById("clock")
						    , targetDate = new Date(theyear, themonth, theday);

						clock.innerHTML = countdown(targetDate).toHTML();
						setInterval(function()
						{
						 	clock.innerHTML = countdown(targetDate).toHTML();
							if(count > 1)
							{
								countdowntext.insertBefore(newItem, countdowntext.childNodes[1]);
							}

							if(count > 2)
							{
								countdowntext.insertBefore(newItem2, countdowntext.childNodes[3]);
							}

							if(count > 3)
							{
								countdowntext.insertBefore(newItem3, countdowntext.childNodes[5]);
							}

							if(count > 4)
							{
								countdowntext.insertBefore(newItem4, countdowntext.childNodes[7]);
							}
						  }, 1000);
				var countdowntext = document.getElementById("clock");
				var count = countdowntext.childElementCount;
				if(count > 1)
				{
					countdowntext.insertBefore(newItem, countdowntext.childNodes[1]);
				}

				if(count > 2)
				{
					countdowntext.insertBefore(newItem2, countdowntext.childNodes[3]);
				}

				if(count > 3)
				{
					countdowntext.insertBefore(newItem3, countdowntext.childNodes[5]);
				}

				if(count > 4)
				{
					countdowntext.insertBefore(newItem4, countdowntext.childNodes[7]);
				}

			}