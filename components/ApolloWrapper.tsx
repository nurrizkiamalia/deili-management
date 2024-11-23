"use client";

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
