resume = open("about.html", "r").read()
resume = resume.split("<!--START_END_PDF_SPLITTER-->")
resume = resume[0] + resume[2] + resume[4]
resume = resume.split('resumePage"')
resume = resume[0] + 'resumePage" style="text-align: center; width: 100%; background: white;"' + resume[1];
resume = resume.split('<body>')
resume = resume[0] + '<body style="background: white; margin: 2em; margin-bottom: 0em;">' + resume[1]
open("resume.html", "w").write(resume)


