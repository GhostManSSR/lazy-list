import ListNews from "@/components/News/ListNews";

const ImportantNews:React.FC<{}> = () => {

    return (
        <div style={{marginBottom: "200px"}}>
            <ListNews type={"important"}/>
        </div>
    )
}

export default ImportantNews;