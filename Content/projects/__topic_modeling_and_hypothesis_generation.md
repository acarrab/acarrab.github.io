# Honors Research Project for Senior Year

This project is a school year long project in which I am working along side grad students in the ACS Lab (Algorithms and Computational Sciences Lab). I am adding to the work being done by [Justin Sybrandt](http://sybrandt.com/) by determining if we can increase the accuracy of Moliere, a hypothesis generation method.

We are seeing if it helps to extract additional information from the full-texts and, if so, how to best do so.

## Progress

*Last updated: Tuesday, October 24th 2017*

All code is parallelized and ran on the [Clemson Palmetto Cluster](https://www.palmetto.clemson.edu/palmetto/userguide_palmetto_overview.html) in order to complete tasks in reasonable amount of time.
Using [mpi4py](http://mpi4py.readthedocs.io/en/stable/) in order to run text extraction on the million documents in parallel on the Clemson Palmetto Cluster

Started by downloading 1.7 million documents over ftp from [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/)

1. Wrote code to parse xml documents tree structure with hierarchical selection by walking through xml tree and grabbing what I need (example under **hierarchical selection example** section)
    - Down to 1.4 million documents because: some did not have abstracts, were not research papers, or were not in proper xml format.
1. Wrote and ran code to clean text of unicode expressions and in text equations using regular expressions.
1. Used [NLTK](http://www.nltk.org/) in order to lemmatize text in order to be passed into the next part of the pipeline, the creation of the n_grams.
1. Ran Abstracts through topic modeling stage of Moliere Pipeline

### N-gram creation

*Monday, October 30th*

Learned how create n-grams through ToPMine with help of Justin, then ran the process on Abstracts document subset.

Currently only on Abstract documents and will analyze soon analyze the validity of the results that were found before running the long (maybe week long) n-gram creation on the rest of the documents.

### Removal of files that are too new from the dataset

*Tuesday, October 24th*

Went back through pipeline that has been created so far and added a small amount of code to determine if the publish date of the article was this year as we will be removing those from the data set in order to see if prediction is valid for this year. No need for predicting things we really don't know yet, because there is no basis for comparison.

At the end of this process, it has been determined that there are now only 1.3 million articles left in totality. There are a suspicious amount of articles that are lost to being too new and I will be looking at that later, but for now am just working on lemmatizing the text using different methods.

Here is the breakdown of documents (that are currently stored in separate files according to the number of processes):

```bash
[acarrab@login001 lemmatizedText]$ wc -l Abstracts_* | grep total
   1328035 total
```

Here is the breakdown of how the documents were lost.

```bash
[acarrab@login001 acarrab]$ wc -l *.log
  151427 failedDuringParsingOrNoAbstract.log
   53872 hasAbstractAndFailed.log
  164944 tooNewButHadAbstract.log
  370243 total
```

NOTE: `tooNewButHadAbstract.log` is not necessarily accurate since it would put 3000 as year if the parsing could not find the date. 

I have looked at lemmatization through the means of using specialist NLP tool in order to use those to lemmatize the text, but to no avail. (A lot more learning than initially thought was needed is needed in order to use their tools).

In order to get some results, used the NLTK's lemmatizer in order lemmatize the text from the research papers. The papers are now ready for the next phase, the building of the n-grams.

After speaking with Justin, he has seen that the benefits of using the Specialist NLP Tools is actually too slow for our data-set size in the end anyways and NLTK lemmatization does a good job and gives promising and significant results within the research that he has done.

### Increasing valid parsing rate

*Monday, October 16th*

After running the jobs in order to parse the documents, added basic statistics capturing that are added to files while running batch job on the almost 1.8 million documents. At the end of the run, there are counts for different types of errors

- Failure to parse xml errors

- Had abstract keyword within file, but still failed

- Failed for other reasons

Given this information, I can now look at the files that failed yet had the abstract keyword and determine how to reduce the number of files that are failed to be parsed.

### Quality analysis of xml parsing

*Wednesday, October 11th*

Went through a random subset of the documents and looked at results from parsing in order to determine whether the parsing was doing what it should be doing. After making some modifications to the code written in the previous week, there is a good likelihood of valid parsing.

Also inserted failure cases for parse if things like the abstracts were missing.

Ran parsing parallelized on palmetto cluster and looked determined results so far. More validation should be done in order to make sure that most of the data are being used.

Files are saved in only abstract format and also full-text and abstract format in order to create distinct sets of documents that can give good comparison.

### Heirarchical parsing of xml documents

*Wednesday, October 4th*

Wrote code to parse out unicode characters as well as select out abstracts and other relevant text sections from the millions of documents.

Created method for parsing out xml documents tags that are needed in with hierarchical selection.

#### Example and Explanation

Wrote code that extracts the following information by populating a data object with the keywords under the `"GET"` keyword under selection through chains of nested objects. For example, if an article title is found in the xml tree under `<article-meta><title-group><article-title>` tags, then `data["Title"]` will be set to an array containing the found data.

This is a kind of cool way to extract the required information from the xml tree structure. Kind of inspired by [graphql](http://graphql.org/) selection statements in order to populate arrays of data.

```python
chains = [
    {
        "article-meta": {
            "title-group": {
                "article-title": {
                    "GET": "Title"
                }
            }
        },
        "kwd-group": {
            "kwd": {
                "GET": "Keywords"
            }
        },
        "contrib-group": {
            "contrib": {
                "GETALL": "Contributors"
            }
        },
```

### Downloading Documents

*Thursday, September 28th*

Downloaded the documents over ftp from [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/) and moved them onto the Palmetto Cluster.

Became familiar with some of [NLTK](http://www.nltk.org/) and processes like lemmatization and stemming. We will be using lemmatization for our work.

### Data Selection Decision

*Wednesday, September 20th*

After looking through different sources of data this week and talking with my research mentor, it has been decided that using [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/) as the sole data source should give enough documents to have good results. Furthermore, the data source contains parsed documents in XML format which allows for minimal use of additional parsing techniques from PDF format.

### Read through papers

*Wednesday, September 13th*

After being introduced to subjects by reading research papers, I have a decent understanding of the process that is taken to get from the step of text extraction and input to hypothesis generation (with lack of understanding of some specifics). I will be speaking with Justin some time this week in order to work out some questions I have about the process, but overall seems like a very cool process.

I am now starting to look through different sources of data. The main and quickest source to find is [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/), but—given that this should have on the order of a couple of million of articles—this could be enough if no other viable source of data is found.

I have also been looking into different programs for parsing text from PDF format.
### Beginning of Research

*Wednesday, September 6th*

Met with Dr. Safro and Dr. Herzog, and Justin Sybrandt from the ACS Lab. Introduced to and talked with Justin about his research and where my additional work will fit in. 

What I will be doing is working on reapplying Topic Modeling and Hypothesis Generation with abstracts and also full-text research papers as data input. This will require:

1. Reading through paper on [MOLIERE: Automatic Biomedical Hypothesis Generation System](https://arxiv.org/abs/1702.06176) as well as others in order to become introduced to research at large within this particular area.
    - Others Include
        - [The structural and content aspects of abstracts versus bodies of full text journal articles are different](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-492)
        - [Text mining of 15 million full-text scientific articles](https://www.biorxiv.org/content/biorxiv/early/2017/07/11/162099.full.pdf)

1. Finding of papers in large enough size so that reliable results and valid comparisons can be made. 
1. Parsing out text from papers and removing things like, equations, tables, image links and references.