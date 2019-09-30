'use strict';

import ArticlePreview from './ArticlePreview';
import React from 'react';

const ArticleList = props => {
    if (!props.articles){
        return (
            <div className="article-preview">Loading...</div>
        )
    }

    if (props.articles.length === 0){
        return (
            <div>Sem artigos ainda</div>
        );
    }

    return (
        <div>
            {
                props.articles.map(article => {
                    return (
                        <ArticlePreview article={article} key={article.slug} />
                    );
                })
            }
        </div>
    );
};

export default ArticleList;