import { PostgreConfig } from "../config/postgre.js"
export const postService = async (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    const postgreService = PostgreConfig.getInstance();

    const {start, size, globalFilter, sorting} = req.query;
    let query = `SELECT COUNT(*) FROM posts;`;
    // query+=`SELECT * FROM posts `;
    
    // if(globalFilter){query+=`WHERE title LIKE '%${globalFilter}' OR body LIKE '%${globalFilter}%' `}
    // const sortingParsed = JSON.parse(sorting?sorting:'[]');
    // if(sortingParsed.length){
    //     query+=`ORDER BY ${sortingParsed[0].id} ${sortingParsed[0].desc?'DESC':'ASC'} `;
    // }else{
    //     query+=`ORDER BY id ASC `;
    // }
    // query+=`LIMIT ${size??10} OFFSET ${start??0}`;
    try{
        const result = await postgreService.pool.query(query)
    console.log(5)
        res.status(200).json({meta: {totalRowCount:result[0].rows[0].count}, data: result[1].rows})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "internal server error"})
    }
}