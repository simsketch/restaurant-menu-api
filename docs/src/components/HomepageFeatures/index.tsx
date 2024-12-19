import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  icon: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'GraphQL Powered',
    icon: '⚡',
    description: (
      <>
        Modern API with type-safe queries and mutations. Get exactly the data
        you need, nothing more, nothing less.
      </>
    ),
  },
  {
    title: 'Restaurant Ready',
    icon: '🍽️',
    description: (
      <>
        Built specifically for restaurant menus with support for categories,
        items, prices, and customization options.
      </>
    ),
  },
  {
    title: 'Developer Friendly',
    icon: '🛠️',
    description: (
      <>
        TypeScript support, interactive playground, and comprehensive
        documentation to get you up and running quickly.
      </>
    ),
  },
];

function Feature({title, description, icon}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <span style={{ fontSize: '3rem' }}>{icon}</span>
        </div>
        <div className="text--center padding-horiz--md">
          <h3 className={styles.featureTitle}>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
} 