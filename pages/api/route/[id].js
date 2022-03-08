import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const routeId = req.query.id

  if (req.method === 'GET') {
    handleGET(routeId, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(routeId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/route/:id
async function handleGET(routeId, res) {
  const route = await prisma.route.findUnique({
    where: { id: Number(routeId) },
  })
  res.json(route)
}

// DELETE /api/route/:id
async function handleDELETE(routeId, res) {
  const route = await prisma.route.delete({
    where: { id: Number(routeId) },
  })
  res.json(route)
}
