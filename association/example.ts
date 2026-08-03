abstract class WebsiteContent {
    protected text: string = '';

    setText(text: string): void {
        this.text = text;
    }

    abstract print(): void;
}
/**************************/
class ListContent extends WebsiteContent {
    print(): void {
        console.log(`<ul><li>${this.text
            }</li></ul>`);
    }
}
/**************************/
class ParagraphContent extends WebsiteContent {
    print(): void {
        console.log(`<p>${this.text
            }</p>`);
    }
}
/**************************/
class Website {
    constructor(private content: string) { }
    // Association — Website uses (WebsiteContent) but doesn't own it
    // (WebsiteContent) is a parameter, not a property of the Website class
    // (WebsiteContent) is a temporary object used to print the content of the website
    printContent(websiteContent: WebsiteContent): void {
        websiteContent.setText(this.content);
        websiteContent.print();
    }
}
/**************************/
let listContent: WebsiteContent | null = new ListContent();
let paragraphContent: WebsiteContent | null = new ParagraphContent();

let website: Website | null = new Website('moeid215.com');
website.printContent(listContent);
website.printContent(paragraphContent);

website = null; // Simulates removing the website — flow still works
listContent.setText("List will not be affected, I'm only Associated with Website!");
listContent.print();
paragraphContent.setText("Paragraph will not be affected, I'm only Associated with Website!");
paragraphContent.print();
