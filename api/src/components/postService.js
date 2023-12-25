import { PostgreConfig } from "../config/postgre.js"
export const postService = async (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    const postgreService = PostgreConfig.getInstance();

    const {start, size, globalFilter, sorting} = req.query;
    // let query = `SELECT COUNT(*) FROM posts;`;
    let query=`SELECT *, COUNT(*) OVER() AS totalRowCount FROM posts `;
    if(globalFilter){query+=`WHERE title LIKE '%${globalFilter}' OR body LIKE '%${globalFilter}%' `}
    const sortingParsed = JSON.parse(sorting?sorting:'[]');
    if(sortingParsed.length){
        query+=`ORDER BY ${sortingParsed[0].id} ${sortingParsed[0].desc?'DESC':'ASC'} `;
    }else{
        query+=`ORDER BY id ASC `;
    }
    query+=`LIMIT ${size??10} OFFSET ${start??0}`;
    try{
        const result = await postgreService.pool.query(query)
        const totalRowCount = result.rows.length?result.rows[0].totalrowcount:0;
        
        res.status(200).json(
            {meta: {totalRowCount}, 
            data: result.rows.map(r=>{
                const {totalrowcount, ...data1}=r;
                return data1;
            })
        })
    }catch(e){
        console.log(e)
        res.status(500).json({error: "internal server error"})
    }
}