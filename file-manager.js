;(function(){
var fs = require('fs');

var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		} else if (inputSplit[0] == "rm") {
            var fName = inputSplit[1];
            removeFile(fName);
        } else if (inputSplit[0] == "replace") {
            var fileToSearch = inputSplit[1];
            var wordToReplace = inputSplit[2];
            var replacementWord = inputSplit[3];
            findAndReplace(fileToSearch, wordToReplace, replacementWord);
        } else if (inputSplit[0] == "grep") {
            var fName = inputSplit[1];
            var wordToFind = inputSplit[2];
            findALine(fName, wordToFind);
        }
	}
};

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

    function removeFile(fName) {
            fs.unlink(fName);
            console.log(fName + "deleted successfully");
    }
    
    function findAndReplace(fileToSearch, wordToReplace, replacementWord){
        fs.readFile(fileToSearch, 'utf8', function (err,data) {
              if (err) {
                return console.log(err);
              }
                    var result = data.split(wordToReplace).join(replacementWord);
                  fs.writeFile(fileToSearch, result, 'utf8', function (err) {
                     if (err) return console.log(err);
                  });
            
        });
    }
    
    function findWord(a, b) {
        if (a.indexOf(b) !== -1){
            return true;
        } else {
            return false;
        }
    }
    
    function findALine(fName, wordToFind) {
            fs.readFile(fName, function (err, data) {
                  if (err) throw err;
                var dataAsArray = data.toString().trim().split("\n");
                for (var i = 0; i < dataAsArray.length; i++)
                  //if(data.toString().indexOf(wordToFind) !== -1){
                    if(findWord(dataAsArray[i], wordToFind)){
                        console.log(dataAsArray[i]);
                    }
                });
    }

process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

}());