import { FC } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCollectionType } from "../../store/reducers/selectedPlaylistSlice";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  styles: any;
  setIsQueueDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CloseButton: FC<Props> = ({ styles, setIsQueueDisplayed }) => {
  const dispatch = useDispatch();
  const hideCurrentQueue = () => {
    dispatch(setSelectedCollectionType("not-selected"));
    setIsQueueDisplayed(false);
  };
  return (
    <div className={styles.closeButton}>
      <IconContext.Provider value={{ size: "23" }}>
        <AiOutlineClose onClick={hideCurrentQueue} />
      </IconContext.Provider>
    </div>
  );
};
