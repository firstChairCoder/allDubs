import { createStore, applyMiddleware, compose } from "redux";
import {
  createMigrate,
  createTransform,
  persistReducer,
  persistStore
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

import reducers from "../reducers";
import Reactotron from "../../reactotron-config";
import MigrationHelpers from "../../utils/migrationHelpers";

const transformCacheVoteMap = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    votes: Array.from(inboundState.votes),
    comments: Array.from(inboundState.comments),
    drafts: Array.from(inboundState.drafts),
    subscribedCommunities: Array.from(inboundState.subscribedCommunities),
    pointActivities: Array.from(inboundState.pointActivities)
  }),
  (outboundState) => ({
    ...outboundState,
    votes: new Map(outboundState.votes),
    comments: new Map(outboundState.comments),
    drafts: new Map(outboundState.drafts),
    subscribedCommunities: new Map(outboundState.subscribedCommunities),
    pointActivities: new Map(outboundState.pointActivities)
  }),
  { whitelist: ["cache"] }
);

const transformWalkthroughMap = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    walkthroughMap: Array.from(inboundState.walkthroughMap)
  }),
  (outboundState) => ({
    ...outboundState,
    walkthroughMap: new Map(outboundState.walkthroughMap)
  }),
  { whitelist: ["walkthrough"] }
);

//Middleware: Redux Persist Config
const persistConfig = {
  //Root
  key: "root",
  //Storage Method (React Native)
  storage: AsyncStorage,
  version: 2, //New version 0, default or previous version -1, versions are useful migrations
  //Blacklist (Don't save specific reducers)
  blacklist: ["communities", "user", "ui"],
  transforms: [transformCacheVoteMap, transformWalkthroughMap],
  migrate: createMigrate(MigrationHelpers.reduxMigrations, { debug: false })
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];

const enhancers = __DEV__
  ? compose(applyMiddleware(...middleware), Reactotron.createEnhancer())
  : applyMiddleware(...middleware);

export const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);
