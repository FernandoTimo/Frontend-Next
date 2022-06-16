export default function Index(req, res) {
  res.status(200).json({ ok: true, data: 'Hello World' });
}
