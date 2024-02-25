import { usePageTitle } from "../hooks/useTittle";
import { useParams } from "react-router-dom";

export const FormDetail = () => {
  const { slug } = useParams();
  usePageTitle(slug);
};
