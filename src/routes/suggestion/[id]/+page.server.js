
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    console.log(params.id)
    const id = params.id
 return {id,}
}