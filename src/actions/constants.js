
const helpConstants = {
    cdHelp : `<div>
    Move to a specific tab (use ls for tab indexes)
    <br><br>
    cd [tab index]
    <br><br>
    </div>`,
    rmHelp : `<div>
    close a tab or group tabs
    <br><br>
    <div id='help-container'>
        <div id='help-commands'>
            <div>-g </div>
        </div>
        <div id='help-text'>
            <div>the name of the group to close</div>
        </div>
    </div>
    <br>
    Examples
    <br>
    rm 15
    <br>
    rm -g "group name"
    <br>
    </div>
    `,
    lsHelp : `<div>
    List open tabs with there index
    </div>
    <br><br>
    <div id='help-container'>
        <div id='help-commands'>
            <div>-g </div>
        </div>
        <div id='help-text'>
            <div>list groups with there tabs</div>
        </div>
    </div>
    <br>
    `,
    findHelp : `<div>
    Search for tabs with given keyword in the tab title or URL
    Example 
    find "keyword"
    </div>
    <br>
    `,
    createHelp : `<div>
    Create a new tab with a given URL or with a google search
    if the argument dons't contain a dot (".")
    <br><br>
    <div id='help-container'>
    <div id='help-commands'>
        <div>-a</div>
        <div>--active</div>
    </div>
    <div id='help-text'>
        <div>move to the tab after creation</div>
        <div>move to the tab after creation</div>
    </div>
    </div>
    <br>
    Examples
    <br>
    create "search this on google"
    <br>
    create -a "http://example.com"
    </div>
    <br>
    `,
    groupHelp : `<div>
    Create a new group or add tabs to a group
    <br><br>
    <div id='help-container'>
    <div id='help-commands'>
        <div>--new</div>
        <div>--name</div>
    </div>
    <div id='help-text'>
        <div>create a tab with the given name and tab indexes</div>
        <div>add tabs to existing group with the given name</div>
    </div>
    </div>
    <br>
    Examples
    <br>
    group --new "Java" 1 5 15
    <br>
    group --name "C" 4 5
    <br>
    </div>
    `,
    ungroupHelp : `<div>
    Ungroup a group or specific tabs from a group
    <br><br>
    <div id='help-container'>
    <div id='help-commands'>
        <div>--tabs</div>
        <div>--name</div>
    </div>
    <div id='help-text'>
        <div>tab indexes</div>
        <div>group name</div>
    </div>    
    </div>
    <br>
    Examples
    <br>
    ungroup --tabs 1 5 15
    <br>
    ungroup --name "Java"
    <br>
    </div>
    `,
    clearHelp : `<div>
    Clear terminal
    <br>
    </div>
    `


}
export const fullHelp = `<div>
For more information on a specific command, type: help [command-name]
<br><br>
<div id='help-container'>
<div id='help-commands'>
    <div>cd</div>
    <div>ls</div>
    <div>create</div>
    <div>group</div>
    <div>ungroup</div>
    <div>rm</div>
    <div>clear</div>
    <div>find</div>
</div>

<div id='help-text'>
    <div>move to a specific tab (use ls for tab indexes)</div>
    <div>print open tabs with there index</div>
    <div>create a new tab with a given url</div>
    <div>create a new group or add a tab to existing group</div>
    <div>ungroup a group or remove a tab from a group</div>
    <div>close a tab or group tabs</div>
    <div>clear terminal</div>
    <div>search for tabs with a specific keyword</div>
</div>
</div>
<br><br>
</div>
`

const cdHelp = `<div>
Move to a specific tab (use ls for tab indexes)
<br><br>
cd [tab index]
<br><br>
</div>
`

const rmHelp = `<div>
close a tab or group tabs
<br><br>
<div id='help-container'>
<div id='help-commands'>
    <div>-g </div>
</div>
<div id='help-text'>
    <div>the name of the group to close</div>
</div>
Examples
rm 15
rm -g "group name"
</div>
<br><br>
</div>
`

const lsHelp = `<div>
List open tabs with there index
</div>
<br><br>
`

const findHelp = `<div>
Search for tabs with given keyword in the tab title or URL
Example 
find "keyword"
</div>
<br><br>
`

const createHelp = `<div>
Create a new tab with a given URL or with a google search
if the argument dons't start with http or https or www google search is used
<br><br>
<div id='help-container'>
<div id='help-commands'>
    <div>--active | -a </div>
</div>
<div id='help-text'>
    <div>move to the tab after creation</div>
</div>
Examples
create "search this on google"
create -a "http://example.com"
</div>
</div>
<br><br>
`

const groupHelp = `<div>
Create a new group or add tabs to a group
<br><br>
<div id='help-container'>
<div id='help-commands'>
    <div>--new</div>
    <div>--name</div>
</div>
<div id='help-text'>
    <div>create a tab with the given name and tab indexes</div>
    <div>add tabs to existing group with the given name</div>
</div>
Examples
group --new "Java" 1 5 15
group --name "C" 4 5
</div>
<br><br>
</div>
`

const ungroupHelp = `<div>
Ungroup a group or specific tabs from a group
<br><br>
<div id='help-container'>
<div id='help-commands'>
    <div>--tabs</div>
    <div>--name</div>
</div>
<div id='help-text'>
    <div>tab indexes</div>
    <div>group name</div>
</div>
Examples
ungroup --tabs 1 5 15
ungroup --name "Java"
</div>
<br><br>
</div>
`

const clearHelp = `<div>
Clear terminal
<br><br>
</div>
`

export {cdHelp, clearHelp, createHelp, findHelp, groupHelp, helpConstants, lsHelp, rmHelp
    , ungroupHelp
}