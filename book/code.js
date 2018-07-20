window.onload = function () 
{
	let editA = document.getElementById("editA");
	let editB = document.getElementById("editB");
	let addBtn = document.getElementById("addBtn");

	let editC = document.getElementById("editC");
	let findBtn = document.getElementById("findBtn");

	let result = document.getElementById("result");
	let error = document.getElementById("error");

    localStorage.setItem("book", JSON.stringify([]));

    ///////////////////////////////////////////////////////

	function getBookArray() {
        return JSON.parse(localStorage.getItem("book"));
    }

    function addRecord(record) {
        let book = getBookArray();
        book.push(record);

        localStorage.setItem("book", JSON.stringify(book));

        console.log(book);
    }

    ///////////////////////////////////////////////////////

    addBtn.onclick = function () {
    	let record = {
    		name: editA.value,
			number: editB.value
		};

    	if (record.name !== "" && record.number !== "") {
            addRecord(record);
            alert("Запись успешно добавлена");
            editA.value = "";
            editB.value = "";
        }
        else {
    		alert("Заполните поля")
		}
    };

    findBtn.onclick = function () {
		let name = editC.value;

		if (name !== "") {
            let number = "NNN";
            let book = getBookArray();

            for (let i = 0; i < book.length; i++) {
                if (book[i].name === name) {
                    number = book[i].number;
                    break;
                }
            }

            if (number !== "NNN") {
                result.innerHTML = name + ": " + number;
                editC.value = "";
            } else {
                error.innerHTML = "Запись не найдена";
            }
		}
		else {
            alert("Заполните поля");
        }
    }
};
