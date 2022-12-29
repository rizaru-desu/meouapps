import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const RefNavigation = React.createRef();

export async function navigate(route, params) {
  await RefNavigation.current?.navigate(route, params);
}

export async function replace(route, params) {
  await RefNavigation.current?.dispatch(StackActions.replace(route, params));
}

export async function pop() {
  await RefNavigation.current?.dispatch(StackActions.pop());
}

export async function goBack(route, params) {
  await RefNavigation.current?.goBack(route, params);
}
