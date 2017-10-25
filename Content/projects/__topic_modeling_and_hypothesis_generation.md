# Honors Research Project for Senior Year

This project is a school year long project in which I am working along side grad students in the ACS Lab (Algorithms and Computational Sciences Lab). I am adding to the work being done by [Justin Sybrandt](http://sybrandt.com/) by determining if we can increase the accuracy of Molier, a hypothesis generation method.

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

### Hierarchical selection example

This code extracts the following information by populating a data object with the keywords under the `"GET"` keyword. For example, if an article title is found in the xml tree under `<article-meta><title-group><article-title>` tags, then `data["Title"]` will be set to an array containing the found data.

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