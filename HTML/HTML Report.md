# HTML Report
This program is a sample for use HTML for result visualizations.

It use a template File for all the HTML frame construction.
This File is loaded in the "HTML Report.simpl" and the placeholders in the SimPL StringFormat syntax.

For this purpose you must add "{0}" .. "{9}" placeholders in the HTML file.
```
<div style="margin-left: 30px">
    <h2>{0}</h2>
    <div id="Output">{1}</div>
</div>
```
This placeholders are replaced with the SimPL Program.
```
htmlTemplate = FileRead( filename=inputTemplateFilename)

htmlResult = StringFormat(
    baseString=htmlTemplate
    p0="Header description"
    p1=CreateHtmlTable(dataTable=CreateTestData))    
```


As result you get a neat styled result for documentation.
