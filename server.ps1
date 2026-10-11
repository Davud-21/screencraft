param(
  [int]$Port = 5000,
  [string]$Directory = $PSScriptRoot
)

$mimeTypes = @{
  ".html"  = "text/html; charset=utf-8"
  ".css"   = "text/css; charset=utf-8"
  ".js"    = "application/javascript; charset=utf-8"
  ".json"  = "application/json; charset=utf-8"
  ".png"   = "image/png"
  ".jpg"   = "image/jpeg"
  ".jpeg"  = "image/jpeg"
  ".gif"   = "image/gif"
  ".svg"   = "image/svg+xml"
  ".ico"   = "image/x-icon"
  ".woff2" = "font/woff2"
}

function Start-DevServer {
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add("http://localhost:$Port/")
  try {
    $listener.Prefixes.Add("http://127.0.0.1:$Port/")
  } catch {}

  try {
    $listener.Start()
    Write-Host "ScreenCraft Dev Server running at http://localhost:$Port/ and http://127.0.0.1:$Port/"
  } catch {
    $script:Port = 8080
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$script:Port/")
    try { $listener.Prefixes.Add("http://127.0.0.1:$script:Port/") } catch {}
    $listener.Start()
    Write-Host "ScreenCraft Dev Server running at http://localhost:$script:Port/ and http://127.0.0.1:$script:Port/"
  }

  while ($true) {
    try {
      if (-not $listener.IsListening) {
        $listener.Start()
      }

      $context = $listener.GetContext()
      $request = $context.Request
      $response = $context.Response

      $response.AddHeader("Access-Control-Allow-Origin", "*")
      $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")

      $rawPath = $request.Url.LocalPath.TrimStart('/')
      if ([string]::IsNullOrWhiteSpace($rawPath)) {
        $rawPath = "index.html"
      }

      $filePath = [System.IO.Path]::Combine($Directory, $rawPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

      if ([System.IO.File]::Exists($filePath)) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $response.ContentType = $contentType

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.StatusCode = 200
      } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawPath")
        $response.ContentType = "text/plain; charset=utf-8"
        $response.ContentLength64 = $msg.Length
        $response.OutputStream.Write($msg, 0, $msg.Length)
      }

      $response.OutputStream.Close()
    } catch {
      Start-Sleep -Milliseconds 50
    }
  }
}

Start-DevServer
