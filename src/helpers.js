//pass in json objects, sort by fact length
export function sortByFactLength(a, b) {
	console.log(a, b);
	if (a.fact.length < b.fact.length) {
		return -1;
	}
	if (a.fact.length > b.fact.length) {
		return 1;
	}
	return 0;
}

export function getRandoImage(imageArr=[]) {
	fetch('http://mapd-cats.azurewebsites.net/catpics')
		.then(function(response) {
			if (response.status >= 400) {
			  throw new Error("Bad response from server");
			}
			return response.text();
		})
		.then(function(text) {
			const parseString = require('xml2js-parser').parseString;
			parseString(text, (err, result) => {
			  const imageArr = result.response.data[0].images[0].image
			    .map(function(a) {return a.url});
			  var rand = imageArr[Math.floor(Math.random() * imageArr.length)];
			  return rand;
			});
		});
}

// const parseString = require('xml2js-parser').parseString;
          
//           parseString(text, (err, result) => {
//             const imageArr = result.response.data[0].images[0].image
//               .map(function(a) {return a.url});
//             var rand = imageArr[Math.floor(Math.random() * imageArr.length)];
//             return rand;
//           })
export function getRandoFact() {
	const facts = ["The average cat sleeps 16-18 hours per day.","Calico cats are almost always female.","Most cats are lactose intolerant and should not be given cow’s milk.","Cats knead with their paws when they are happy.",
	"A male cat is called a “Tom” and a female cat is called a “Queen.”","Cats can get tapeworm from eating mice.",
	"Cats have more than 100 different vocal sounds.", "An adult cat has 30 adult teeth.", "Cats can run up to 30 miles per hour.","A cat can jump approximately seven times its height.",
	"A female cat carries her kittens for about 58-65 days before they are born.","Cats cannot taste anything sweet.",
	"A cat’s sense of smell is approximately 14 times greater than that of a human.","A group of kittens is called a kindle; a group of adult cats is called a clowder.","Cats have five toes on each front paw, but only four toes on each back paw.",
	"Cats who fall five stories have a 90 percent survival rate.","A cat’s whiskers aren’t just for show – they help cats detect objects and navigate in the dark.","Cats cannot see in complete darkness, only at low light levels.",
	"Humans greet each other by shaking hands; cats greet one another by touching their noses together.","Cats have sandpaper-like tongues that they use to clean groom themselves.",
	"Unlike humans, cats only sweat through their paws. This is why you may see them leave moist paw prints in the summer time!"]
	return facts[Math.floor(Math.random() * facts.length)];
}