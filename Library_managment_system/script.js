function getData(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Add Book
document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    if (bookForm) {
        bookForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let books = getData("books");
            books.push({
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                genre: document.getElementById("genre").value,
                isbn: document.getElementById("isbn").value,
            });
            saveData("books", books);
            alert("Book added!");
            bookForm.reset();
        });
    }

    // Add Member
    const memberForm = document.getElementById("memberForm");
    if (memberForm) {
        memberForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let members = getData("members");
            members.push({
                name: document.getElementById("memberName").value,
                email: document.getElementById("memberEmail").value,
                id: document.getElementById("memberId").value,
            });
            saveData("members", members);
            alert("Member added!");
            memberForm.reset();
        });
    }

    // Populate dropdowns for Issue Book
    const issueBook = document.getElementById("issueBook");
    const issueMember = document.getElementById("issueMember");
    if (issueBook && issueMember) {
        getData("books").forEach(book => {
            let opt = document.createElement("option");
            opt.text = book.title;
            issueBook.add(opt);
        });
        getData("members").forEach(member => {
            let opt = document.createElement("option");
            opt.text = member.name;
            issueMember.add(opt);
        });

        document.getElementById("issueForm").addEventListener("submit", (e) => {
            e.preventDefault();
            let issues = getData("issues");
            issues.push({
                book: issueBook.value,
                member: issueMember.value,
                issueDate: document.getElementById("issueDate").value,
                returnDate: ""
            });
            saveData("issues", issues);
            alert("Book issued!");
        });
    }

    // Populate dropdowns for Return Book
    const returnBook = document.getElementById("returnBook");
    if (returnBook) {
        getData("issues").filter(i => !i.returnDate).forEach(issue => {
            let opt = document.createElement("option");
            opt.text = `${issue.book} - ${issue.member}`;
            opt.value = issue.book;
            returnBook.add(opt);
        });

        document.getElementById("returnForm").addEventListener("submit", (e) => {
            e.preventDefault();
            let issues = getData("issues");
            let selected = returnBook.value;
            let retDate = document.getElementById("returnDate").value;
            issues.forEach(i => {
                if (i.book === selected && !i.returnDate) {
                    i.returnDate = retDate;
                }
            });
            saveData("issues", issues);
            alert("Book returned!");
        });
    }

    // Reports
    const reportTable = document.getElementById("reportTable");
    if (reportTable) {
        let tbody = reportTable.querySelector("tbody");
        getData("issues").forEach(issue => {
            let row = tbody.insertRow();
            row.insertCell().innerText = issue.book;
            row.insertCell().innerText = issue.member;
            row.insertCell().innerText = issue.issueDate;
            row.insertCell().innerText = issue.returnDate || "Not Returned";
        });
    }
});
