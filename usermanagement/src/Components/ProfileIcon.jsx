import { useNavigate } from "react-router-dom";

function ProfileIcon() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/profile-edit")}
    >
      <img
        src={
          currentUser?.profile ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }
        alt="profile"
        width="40"
        height="40"
        className="rounded-circle border"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default ProfileIcon;