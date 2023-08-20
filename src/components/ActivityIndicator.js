import { Watch } from "react-loader-spinner";

const ActivityIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 200px)",
      }}
    >
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#b42f5a"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default ActivityIndicator;
