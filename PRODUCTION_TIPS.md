# Additional production tips and configurations

## 🔐 Security Recommendations

### 1. Environment Variables
Never commit `.env` files. Keep them only locally and in secure platforms:
- **Render**: Use Environment Variables in dashboard
- **Netlify**: Use Build & Deploy → Environment in dashboard
- **MongoDB Atlas**: Keep credentials safe in `.env` locally only

### 2. HTTPS
Both Render and Netlify provide HTTPS by default. Always use HTTPS URLs.

### 3. Database Security
- Change the default MongoDB password
- Use strong passwords (20+ characters)
- Limit IP access if possible (though 0.0.0.0/0 is needed for presentations)
- Enable MongoDB encryption

### 4. API Security
Add these headers in production (edit `backend/src/index.js`):

```javascript
// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

### 5. Rate Limiting
Install rate limiter:
```bash
npm install express-rate-limit
```

Then use it:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🚨 Common Issues in Production

### Issue: "CORS error when accessing frontend from browser"
**Solution:**
1. Check `CORS_ORIGIN` variable in Render matches Netlify URL
2. Verify the frontend URL is exactly `https://parkin2.netlify.app` (no trailing slash)
3. Check CORS headers are being sent:
   ```bash
   curl -H "Origin: https://parkin2.netlify.app" https://parkin-backend-xxx.render.com/api/health
   ```

### Issue: "MongoDB connection timeout"
**Solution:**
1. Verify `MONGODB_URI` is correct (no typos, password is right)
2. Check MongoDB Atlas Network Access includes 0.0.0.0/0
3. Verify the IP that Render uses is not blocked
4. Try connecting from MongoDB Compass with same URI

### Issue: "Build fails on Render"
**Solution:**
1. Check logs: Render Dashboard → Your service → Logs
2. Verify Node version compatibility (use Node 18+)
3. Ensure all dependencies are in package.json
4. Try building locally first: `npm run build`

### Issue: "Frontend not loading API correctly"
**Solution:**
1. Open browser DevTools (F12) → Console
2. Check for CORS errors
3. Verify `VITE_API_BASE` in Netlify environment variables
4. Rebuild frontend after changing env vars

---

## 📊 Monitoring Production

### Render Monitoring
- Dashboard → Your Service → Metrics (if paid plan)
- Logs tab shows real-time logs
- Set up email notifications for deploys

### Netlify Monitoring
- Dashboard → Deploys tab shows deploy history
- Logs show build errors
- Analytics available (if enabled)

### MongoDB Monitoring
- Atlas Dashboard → Metrics
- Check connection pool status
- Monitor query performance

---

## 🔄 Continuous Updates

To update your production application:

1. **Make changes locally**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

2. **Render will auto-redeploy**
   - Wait for green checkmark
   - Check logs to verify

3. **Netlify will auto-redeploy**
   - Wait for build to complete
   - Preview URL will update

4. **Database**
   - No action needed, it's MongoDB Atlas
   - Data persists between deploys

---

## 💾 Backup Strategy

### Before important presentations:
1. Export MongoDB data:
   - MongoDB Atlas Dashboard → Databases → Export
   - Or use `mongodump`

2. Keep GitHub clean:
   - All code should be committed
   - No sensitive data in repo

3. Document your setup:
   - Save all environment variable keys (not values!)
   - Keep links to dashboards

---

## 🎓 Learning Resources

- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Best Practices](https://react.dev/learn)

---

Last updated: November 25, 2025
