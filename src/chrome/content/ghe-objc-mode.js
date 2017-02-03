(function() {

    function walk(node)
    {
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
        var v = textNode.nodeValue;

        ÷
        ×
        v = v.replace(/\b-+\(\b/g, "÷+(");
        v = v.replace(/\b-+ \(\b/g, "÷+ (");
        v = v.replace(/\b++\(\b/g, "×+(");
        v = v.replace(/\b++ \(\b/g, "×+ (");

        v = v.replace(/\b--\(\b/g, "÷-(");
        v = v.replace(/\b-- \(\b/g, "÷- (");
        v = v.replace(/\b-+\(\b/g, "÷+(");
        v = v.replace(/\b-+ \(\b/g, "÷+ (");

        textNode.nodeValue = v;
    }

    function windowLoadHandler()
    {
        // Dear Mozilla: the original author didn't like, i'm not so sure why because I can't into js
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());