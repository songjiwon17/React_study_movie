export async function getReviews(order = 'createAt'){
    const response = await fetch('https://learn.codeit.kr/0633/film-reviews/')
    const body = await response.json();
    return body;
}