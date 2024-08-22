import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./ReduxSlice";
import videoReducer from "./reduxVideo";
import authorReducer from "./AuthorSlice";
import giftCardSlice from "./giftCardSlice";
import subscriptionSlice from "./subscriptionSlice";
import smsSlice from "./smsSlice";
export const store = configureStore({
  reducer: {
    video: videoReducer,
    data: dataReducer,
    authors: authorReducer,
    giftCard: giftCardSlice,
    subscription: subscriptionSlice,
    sms: smsSlice,
  },
});
