import type { Schema, Struct } from '@strapi/strapi';

export interface TextContentNewsTextContent extends Struct.ComponentSchema {
  collectionName: 'components_text_content_news_text_contents';
  info: {
    displayName: 'News-text-content';
    icon: 'brush';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'text-content.news-text-content': TextContentNewsTextContent;
    }
  }
}
