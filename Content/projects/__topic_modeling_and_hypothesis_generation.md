# Research With [ACS](https://people.cs.clemson.edu/~isafro/group.html)

This project is a school year long project in which I am working along side grad students in the ACS Lab (Algorithms and Computational Sciences Lab). I am adding to the work being done by [Justin Sybrandt](http://sybrandt.com/) by determining if we can increase the accuracy of Moliere, a hypothesis generation method.

We are seeing if it helps to extract additional information from the full-texts and, if so, how to best do so.

## Progress

*Last updated: Monday, November 13th 2017*

All code is parallelized and ran on the [Clemson Palmetto Cluster](https://www.palmetto.clemson.edu/palmetto/userguide_palmetto_overview.html) in order to complete tasks in reasonable amount of time.

Started by downloading 1.7 million documents over ftp from [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/).

1. Wrote code to parse xml documents tree structure with hierarchical selection by walking through xml tree.
    - Down to 1.4 million documents because: some did not have abstracts, were not research papers, or were not in proper xml format.
1. Wrote and ran code to clean text of unicode expressions and in text equations using regular expressions.
1. Used [NLTK](http://www.nltk.org/) in order to lemmatize text in order to be passed into the next part of the pipeline, the creation of the n_grams.
1. Ran Abstracts through n-gram stage of Moliere Pipeline.
1. Ran subsets of full-texts through n-gram stage of Moliere Pipeline.
1. Ran Full-texts through n-gram stage of Moliere Pipeline.
1. Compared Full-text and Abstract n-gram creation.

## Log

<h3>Introduction of Gibbs sampling to abstracts<br><small style="text-align:right">*Wednesday, December 20th*</small></h3>

`REVISION`: The job actually did not finish completely so invalid results for the gibbs comparison with full-texts. I don't think there is a difference...

In order to improve the quality of n-grams we can introduce gibbs sampling. ToPMine
allows specification of the number of sampling iterations. This number is normally set to something on the order of 1000. With an improvement in the quality of topic modeling, we expect there to be an improvement in the quality of n-grams.

Preliminary results show that while there was no effect of gibbs sampling on the topics for abstracts, there was a reduction in the overall number of n-grams for the full-text data-set.

#### Comparison done on random subset of 500,000 documents

With the number of gibbs sampling iterations set to 1000, we reduce the number of unique n-grams from 18,464,534 to 14,533,324 (difference of 3931210). Gibbs sampling only reduces the number of n-grams, but does not create new unique ones.

```bash
$ wc -l gibbsComparison/*
   964247 gibbsComparison/abstract_both.data
        0 gibbsComparison/abstract.data
        0 gibbsComparison/abstract_gibbs.data
 14533324 gibbsComparison/fulltext_both.data
  3931210 gibbsComparison/fulltext.data
        0 gibbsComparison/fulltext_gibbs.data
```

<h3>N-gram Generation Quality Analysis (full-text vs abstracts)<br><small style="text-align:right">*Monday, November 13th*</small></h3>

#### Count comparisons

When analyzing n-gram composition it was noticed that there were some absurd n-grams in the data-set. However, these n-grams compose a small subset of the data (a factor of a million less occurrences) and they occurred in only 1 document in some cases. Because of this, I transitioned the analysis to be done on n-grams according to how many documents they appear, as long as they appear in at least 2 documents. Here are the results.

![](../Resources/TopicModeling/FulltextNgramSizeAppearance.png)

![](../Resources/TopicModeling/AbstractNgramSizeAppearance.png)

As we can see, the results have a similar distribution; However, full-texts generated more non-sense n-grams because of inconsistency in xml and xml parsing strategy. The data has a smooth curve until we get to the point at which we have a lot of variance in the data for the full-texts, possibly indicating that the quality of those n-grams reduces at that point (there is also less data there though, so we should expect to see variance there). N-gram generation seems to be good enough to go into the next stage of the pipeline... FastText.

It may also be beneficial to cut off the n-grams that have a size greater than 20, because it would not reduce the total n-grams by much and would remove some almost useless connections. This will be done later as comparison to see if this will improve quality.

<h3>ngram analysis (full-text vs abstracts)<br><small style="text-align:right">*Monday, November 13th*</small></h3>

#### Number of ngrams

    1,828,429 abstracts_ngram_to_counts.data
    1,543,251 abstracts_reduced_ngram_to_counts.data

      285,178  ngram with count of 1

    66,841,832 fulltexts_ngram_to_counts.data
    44,989,258 fulltexts_reduced_ngram_to_counts.data

    21,852,574  ngrams with count of 1

#### Other weirdness

##### N-gram quality

abstracts still have greater number of 1 gram ngrams than 2 gram

fulltexts do not have as many 1 gram ngrams than 2 grams

##### Really big n-grams

During the first running on counting ngrams in order to analyze the composition of the ngram generation process, it was noticed that there were very large ngrams. However, most of these have been now removed as they only occurred in 1 document and are therefore irrelevant for comparisons when ran through future parts of the pipeline, such as FastText. (they also seemed like strange xml inconsistency issues)

<h3>ngram stats (full-text subset vs abstracts subset)<br><small style="text-align:right">*Tuesday, November 7th*</small></h3>

<center><h4><b>Abstract subset</b> ngrams size (number of words in ngram) to counts</h4></center>

![](../Resources/TopicModeling/abstractSubsetNgramSizeToCounts.png)

<center><h4><b>Fulltext subset</b> ngrams size (number of words in ngram) to counts</h4></center>

![](../Resources/TopicModeling/fulltextSubsetsNgramSizeToCounts.png)

<h3>Running ToPMine on a lot of data<br><small>*Tuesday, November 7th*</small></h3>

There were some problems with this phase. Particularly that the number of tokens at this point of the long running job has encountered overflow. Here is the printout so far.

    /scratch3/acarrab/Desktop/Pipeline/ToPMine/rawFiles/qbf_allFulltexts.txt
    input
    3
    1
    ___
    First pass: finding rare words...
    Second pass: do preprocessing...

    ---------------------------
    The number of documents: 1328035
    The size of the vocabulary: 3610383
    Total tokens: -1288583746
    Minsup = 3

There have been some issues encountered when running the current processes through ToPMine. These are encountered because of: memory usage issues (because of insufficient memory size for the parameterization of the jvm), integer overflow, and overall time to debug is very slow. A lot of the issues were encountered after almost 3 days of running and so were not noticed until that point. 

Solutions

1. memory usage issues
    - Changed node use of 500gb node to 2000gb node.
    - Changed jvm memory parameterization to 1500gb.
1. integer overflow
    - Currently considering finding non-byte code compiled java and changing source code.
    - The tokens are character counts in their context since they later correctly count the number of words so it may not have an effect.
        - 36 million is not enough for integer overflow and the number is 10^10 ≈ 2^30 so it is not smaller than an integer
        - Character counts are not used in ngram creation
    - Removed PMIDs from the file (these are never useful to stem)
1. time to debug
    - using qpeek to check on job and making sure that memory is sufficient to remove chance of page-thrashing so processing rate is going quicker.



<h3>N-gram creation using [ToPMine](https://arxiv.org/pdf/1406.6312.pdf) <small><br>*Monday, October 30th*</small></h3>



Learned how create n-grams through ToPMine with help of Justin, then ran the process on Abstracts document subset.

Currently only on Abstract documents and analyzed the validity of the results through randomly looking at generated topics by looking through topics and seeing if topics made sense. All of them, to me, seem to be valid pairings of things that occur in the same statement so I will be moving ahead with running n-gram creation on a subset of the full-texts now.

Here are some of the topics that were found.

    significantly reduced
    data were collected
    wa examined
    amino acid
    increased risk
    wa present
    cell type
    cell grown
    closed loop
    complex structure
    set of gene
    technique based
    high dose
    survival rate
    health outcome
    human cell

#### Problem with loss of lines

Some of the abstracts were parsed out entirely, so lines were removed, which made us lose tracking information of the document id. There were about 50 that contained all unique words and we can no longer map back the lines since they are different. In order to resolve this issue, it is required to go back and append a non-unique sentence that will not affect the lines.

It was recommended to fix this problem by appending `the quick brown fox. ` to each document which are placed on separate lines, which was easy to do with sed via a simple bash script

**quickBrownFoxify.sh**
```bash
#!/bin/bash

newFile=qbf_$1
cp $1 $newFile
sed -i -e 's/^/Quick Brown Fox. /' $newFile
```

which is called by

```bash
./quickBrownFoxify.sh allAbstracts.txt
```

Now It must be ran again to create the n-grams.

#### Creating random subset of documents from full-texts for testing

Each document is given a random and equal chance of selection while walking through file for a total of 100,000 randomly selected documents.

```python
import random
n = 1328035
k = 100000

with open("fullTexts_subset.txt", "w") as fout:
    with open("allFulltexts.txt", "r") as fin:
        for document in fin:
            # gives us proper chance of selecting document
            if 0 == random.randrange(0, int(n / k)) or n == k:
                fout.write(document)
                k -= 1
                if k % 10000 == 0: print("written: " + str(100000 - k))
                if k == 0: break
            n -= 1
```



<h3>Removal of files that are too new from the dataset<br><small>*Tuesday, October 24th*</small></h3>



Went back through pipeline that has been created so far and added a small amount of code to determine if the publish date of the article was this year as we will be removing those from the data set in order to see if prediction is valid for this year. No need for predicting things we really don't know yet, because there is no basis for comparison.

At the end of this process, it has been determined that there are now only 1.3 million articles left in totality. There are a suspicious amount of articles that are lost to being too new and I will be looking at that later, but for now am just working on lemmatizing the text using different methods.

Here is the breakdown of documents (that are currently stored in separate files according to the number of processes):

```bash
[acarrab]$ wc -l Abstracts_* | grep total
   1328035 total
```

Here is the breakdown of how the documents were lost.

```bash
[acarrab]$ wc -l *.log
  151427 failedDuringParsingOrNoAbstract.log
   53872 hasAbstractAndFailed.log
  164944 tooNewButHadAbstract.log
  370243 total
```

NOTE: `tooNewButHadAbstract.log` is not necessarily accurate since it would put 3000 as year if the parsing could not find the date. 

I have looked at lemmatization through the means of using specialist NLP tool in order to use those to lemmatize the text, but to no avail. (A lot more learning than initially thought was needed is needed in order to use their tools).

In order to get some results, used the NLTK's lemmatizer in order lemmatize the text from the research papers. The papers are now ready for the next phase, the building of the n-grams.

After speaking with Justin, he has seen that the benefits of using the Specialist NLP Tools is actually too slow for our data-set size in the end anyways and NLTK lemmatization does a good job and gives promising and significant results within the research that he has done.



<h3>Increasing valid parsing rate<br><small>*Monday, October 16th*</small></h3>



After running the jobs in order to parse the documents, added basic statistics capturing that are added to files while running batch job on the almost 1.8 million documents. At the end of the run, there are counts for different types of errors

- Failure to parse xml errors

- Had abstract keyword within file, but still failed

- Failed for other reasons

Given this information, I can now look at the files that failed yet had the abstract keyword and determine how to reduce the number of files that are failed to be parsed.



<h3>Quality analysis of xml parsing<br><small>*Wednesday, October 11th*</small></h3>



Went through a random subset of the documents and looked at results from parsing in order to determine whether the parsing was doing what it should be doing. After making some modifications to the code written in the previous week, there is a good likelihood of valid parsing.

Also inserted failure cases for parse if things like the abstracts were missing.

Ran parsing parallelized on palmetto cluster and looked determined results so far. More validation should be done in order to make sure that most of the data are being used.

Files are saved in only abstract format and also full-text and abstract format in order to create distinct sets of documents that can give good comparison.

#### Regular expression cleaning of text

Text cleaning for later stages and applied to all text that is seen later in the pipeline

```python
#defined in a class
def stringClean(self, s=""):
    # removals that can bring together two terms and turn them into an ngram almost
    for removal in ["/", "\\", "'", "," "^"]:
        s = s.replace(removal, "")

    # more delimeters that are usually separating
    for delimiter in [";"]:
        s = s.replace(delimiter, " ")

    # conversions of items into ngrams/words 
    for replacement in [("-", "_"), ("%", " percent "), ("@", " at "), ("!", ".")]:
        s = s.replace(replacement[0], replacement[1])

    # fix repeated periods
    s = re.sub(r"\.+", ".", s)

    # concatenate things together that are either digits
    # i.e 5.61094 to 5_61094 and P.M.C. to P_M_C.
    x = re.sub(r"(\S)\.(\S)", r"\1_\2", s)

    # remove reference tags
    s = re.sub(r"\[[0-9]+\]", "", s)

    # should run only twice at most, i.e. once above and once in while loop
    while s != x:
        s = x
        x = re.sub(r"(\S)\.(\S)", r"\1_\2", s)

    # reduce multiple spaces and non-text characters
    s = re.sub(r"\s+", " ", re.sub(r"[^0-9a-z\.\-_\s]", " ", s))
    # remove spaces that are in between text and period
    s = re.sub(r"(\S)\s+\.\s", r"\1\. ", s)
    return s
```



<h3>Heirarchical parsing of xml documents<br><small>*Wednesday, October 4th*</small></h3>



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



<h3>Downloading Documents<br><small>*Thursday, September 28th*</small></h3>



Downloaded the documents over ftp from [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/) and moved them onto the Palmetto Cluster.

Became familiar with some of [NLTK](http://www.nltk.org/) and processes like lemmatization and stemming. We will be using lemmatization for our work.



<h3>Data Selection Decision<br><small>*Wednesday, September 20th*</small></h3>



After looking through different sources of data this week and talking with my research mentor, it has been decided that using [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/) as the sole data source should give enough documents to have good results. Furthermore, the data source contains parsed documents in XML format which allows for minimal use of additional parsing techniques from PDF format.



<h3>Read through papers<br><small>*Wednesday, September 13th*</small></h3>



After being introduced to subjects by reading research papers, I have a decent understanding of the process that is taken to get from the step of text extraction and input to hypothesis generation (with lack of understanding of some specifics). I will be speaking with Justin some time this week in order to work out some questions I have about the process, but overall seems like a very cool process.

I am now starting to look through different sources of data. The main and quickest source to find is [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/), but—given that this should have on the order of a couple of million of articles—this could be enough if no other viable source of data is found.

I have also been looking into different programs for parsing text from PDF format.



<h3>Beginning of Research<br><small>*Wednesday, September 6th*</small></h3>



Met with Dr. Safro and Dr. Herzog, and Justin Sybrandt from the ACS Lab. Introduced to and talked with Justin about his research and where my additional work will fit in. 

What I will be doing is working on reapplying Topic Modeling and Hypothesis Generation with abstracts and also full-text research papers as data input. This will require:

1. Reading through paper on [MOLIERE: Automatic Biomedical Hypothesis Generation System](https://arxiv.org/abs/1702.06176) as well as others in order to become introduced to research at large within this particular area.
    - Others Include
        - [The structural and content aspects of abstracts versus bodies of full text journal articles are different](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-492)
        - [Text mining of 15 million full-text scientific articles](https://www.biorxiv.org/content/biorxiv/early/2017/07/11/162099.full.pdf)

1. Finding of papers in large enough size so that reliable results and valid comparisons can be made. 
1. Parsing out text from papers and removing things like, equations, tables, image links and references.