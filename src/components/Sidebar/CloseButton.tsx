import { FC } from "react";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setIsSelected } from "../../store/reducers/selectedPlaylistSlice";

interface Props {
  styles: any;
}

const CloseButton: FC<Props> = ({ styles }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <IconContext.Provider value={{ size: "32" }}>
        <AiOutlineClose
          className={styles.closeButton}
          onClick={() => {
            dispatch(setIsSelected(false));
          }}
        />
      </IconContext.Provider>
    </div>
  );
};

export default CloseButton;
