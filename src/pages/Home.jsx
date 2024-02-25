import { usePageTitle } from "../hooks/useTittle";
import { CheckIfLoggedIn } from "../utils/isLoggedIn";

export const Home = () => {
  usePageTitle("Formify");

  // Check if user is logged in
  CheckIfLoggedIn();
};
