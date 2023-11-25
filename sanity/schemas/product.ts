export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name of product'
        },
        {
            name: 'price',
            type: 'number',
            title: 'Product price'
        },
        {
            name: 'price_id',
            type: 'string',
            title: 'Stripe Price ID'
        },
        {
            name: 'images',
            type: 'array',
            title: 'Product images',
            of: [{ type: 'image' }]
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Product slug',
            options: {
                source: 'name'
            }
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description of product'
        },
        {
            name: 'category',
            type: 'reference',
            title: 'Product category',
            to: [
                {
                    type: 'category'
                }
            ]
        },
    ]
}