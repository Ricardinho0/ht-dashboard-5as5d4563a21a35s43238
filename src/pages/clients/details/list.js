import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { ContributorService } from "service/contributor"
import NewContributor from "./newContributor";
const List = (props) => {

    const [user, setUser] = useState();

    const [showNewContributor, setshowNewContributor] = useState(false);

    const GetContributors = () => {
        console.log(props)
        ContributorService.contributor(user?.id_revenda)
            .catch(() => { })
    }

    useEffect(() => {
        if (user) {
            // GetContributors()
        }
    }, [user])

    useEffect(() => {
        if (props?.user) {
            setUser(props?.user)
        }
    }, [props])

    return (
        <div className="w-100 p-2">
            <div className="d-inline-flex align-items-center justify-content-between w-100">
                <div>Clientes</div>
                <Button onClick={setshowNewContributor}>Novo cliente</Button>
            </div>
            <NewContributor 
                show={showNewContributor}
                user={user}
                onClose={() => setshowNewContributor(false)}
            />
        </div>
    )
}

export default List;