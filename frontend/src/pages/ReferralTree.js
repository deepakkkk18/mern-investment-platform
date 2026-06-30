import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function TreeNode({ node, level = 1 }) {

    return (

        <div
            style={{
                marginLeft:
                    level === 1
                        ? "0px"
                        : "40px",
                marginTop: "20px"
            }}
        >

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                    color: "#fff",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow:
                        "0 5px 15px rgba(0,0,0,.2)",
                    width: "100%",
                    maxWidth: "400px",
                    position: "relative"
                }}
            >

                <div
                    style={{
                        fontSize: "40px",
                        textAlign: "center"
                    }}
                >
                    👤
                </div>

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "10px"
                    }}
                >
                    {node.fullName}
                </h2>

                <p>
                    <strong>Email:</strong>{" "}
                    {node.email}
                </p>

                <p>
                    <strong>Referral:</strong>{" "}
                    {node.referralCode}
                </p>

                <span
                    style={{
                        background:
                            "#22c55e",
                        color: "#fff",
                        padding:
                            "6px 15px",
                        borderRadius:
                            "20px",
                        display:
                            "inline-block",
                        marginTop:
                            "10px"
                    }}
                >
                    Level {level}
                </span>

            </div>

            {

                node.children &&
                node.children.length > 0 && (

                    <div
                        style={{
                            marginLeft: "30px",
                            borderLeft:
                                "4px solid #7c3aed",
                            paddingLeft:
                                "30px",
                            marginTop:
                                "15px"
                        }}
                    >

                        {

                            node.children.map(
                                (child) => (

                                    <TreeNode
                                        key={
                                            child._id
                                        }
                                        node={child}
                                        level={
                                            level +
                                            1
                                        }
                                    />

                                )
                            )

                        }

                    </div>

                )

            }

        </div>

    );
}

function ReferralTree() {

    const [tree, setTree] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchTree();

    }, []);

    const fetchTree = async () => {

        try {

            const response =
                await API.get(
                    "/referrals/referral-tree"
                );

            setTree(
                response.data.referralTree
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to load referral tree"
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

    return <Loader />;

}

    return (

        <>
            <Navbar />

            <div
                style={{
                    width: "95%",
                    maxWidth: "1400px",
                    margin: "30px auto"
                }}
            >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom:
                        "30px"
                }}
            >
                Referral Network
            </h1>

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                    color: "#fff",
                    padding: "25px",
                    borderRadius:
                        "15px",
                    textAlign:
                        "center",
                    marginBottom:
                        "30px",
                    boxShadow:
                        "0 5px 15px rgba(0,0,0,.2)"
                }}
            >

                <h3>
                    Total Direct Referrals
                </h3>

                <h1>
                    {tree.length}
                </h1>

            </div>

            {

                tree.length === 0 ? (

                    <div
                        style={{
                            background:
                                "#fff",
                            padding:
                                "40px",
                            borderRadius:
                                "15px",
                            textAlign:
                                "center",
                            boxShadow:
                                "0 5px 15px rgba(0,0,0,.1)"
                        }}
                    >

                        <h2>
                            No Referral Network Yet
                        </h2>

                        <p>
                            Invite users
                            using your
                            referral code.
                        </p>

                    </div>

                ) : (

                    tree.map(
                        (member) => (

                            <TreeNode
                                key={
                                    member._id
                                }
                                node={
                                    member
                                }
                            />

                        )
                    )

                )

            }

            </div>

        </>

    );
}

export default ReferralTree;