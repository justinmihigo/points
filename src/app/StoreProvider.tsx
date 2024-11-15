import store, {AppStore} from "@/utils/store";
import { useRef } from "react";
import { Provider } from "react-redux"

export default function ReduxProvider({
    children
  }: {

    children: React.ReactNode;
  }) {
    const makeStore= useRef<AppStore>();
    if(!makeStore.current){
      makeStore.current = store();
    }
    return <Provider store={makeStore.current}>{children}</Provider>;
  }