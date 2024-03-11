import { useNavigate } from "react-router-dom";

// Check if user is creator
export const CheckIfCreator = (creatorId, userId) => {
  const navigate = useNavigate();

  if (creatorId != userId) {
    navigate("/forbidden"); // Navigate only if user is not the creator
  }
};
