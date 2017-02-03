(function() {
    console.log("starting")
    function walk(node)
    {
        console.log("walking")
        // I stole this function from here:
        // https://github.com/DaveRandom/cloud-to-butt-mozilla/blob/master/src/chrome/content/cloud-to-butt.js

        var child, next;

        switch ( node.nodeType )
        {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
            child = node.firstChild;
            while ( child )
            {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

            case 3: // Text node
            handleText(node);
            break;
        }
    }

    function handleText(textNode)
    {
        console.log("handling text")
        var v = textNode.nodeValue;

        v = v.replace("++", "+(class func)");
        v = v.replace("-+", "-(class func)");
        v = v.replace("--", "-(func)");
        v = v.replace("+-", "+(func)");

        textNode.nodeValue = v;
    }

    function windowLoadHandler()
    {
        console.log("window loader")
        // Dear Mozilla: the original author didn't like, i'm not so sure why because I can't into js
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    console.log("adding event listener")
    window.addEventListener('load', windowLoadHandler);
}());