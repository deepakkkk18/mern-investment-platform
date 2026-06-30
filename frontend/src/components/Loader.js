function Loader() {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh"
            }}
        >

            <div
                style={{
                    width: "70px",
                    height: "70px",
                    border:
                        "8px solid #ddd",
                    borderTop:
                        "8px solid #6366f1",
                    borderRadius: "50%",
                    animation:
                        "spin 2s linear infinite"
                }}
            />

            <style>
                {`
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>

        </div>

    );
}

export default Loader;